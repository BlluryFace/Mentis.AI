// gmail.js
import fs from 'fs'
import path from 'path'
import http from 'http'
import open from 'open'
import destroyer from 'server-destroy'
import { google } from 'googleapis'

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']
const CREDENTIALS_PATH = path.join(process.cwd(), 'credential.json')
const TOKEN_PATH = path.join(process.cwd(), 'token.json')

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.promises.readFile(TOKEN_PATH, 'utf8')
    return JSON.parse(content)
  } catch (err) {
    return null
  }
}

async function authorize() {
  const content = await fs.promises.readFile(CREDENTIALS_PATH, 'utf8')
  const credentials = JSON.parse(content)
  const { client_secret, client_id, redirect_uris } = credentials.web

  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  )

  const token = await loadSavedCredentialsIfExist()
  if (token) {
    oAuth2Client.setCredentials(token)
    return oAuth2Client
  }

  return getAccessToken(oAuth2Client)
}

async function getAccessToken(oAuth2Client) {
  return new Promise((resolve, reject) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    })

    const server = http.createServer(async (req, res) => {
      if (req.url.indexOf('/oauth2callback') > -1) {
        const url = new URL(req.url, 'http://localhost:3000')
        const code = url.searchParams.get('code')

        res.end('Authentication successful! You can close this tab.')
        server.destroy()

        const { tokens } = await oAuth2Client.getToken(code)
        oAuth2Client.setCredentials(tokens)
        await fs.promises.writeFile(TOKEN_PATH, JSON.stringify(tokens))
        resolve(oAuth2Client)
      }
    }).listen(3000, () => {
      open(authUrl)
    })

    destroyer(server)
  })
}

async function listLabels(auth) {
  const gmail = google.gmail({ version: 'v1', auth })
  const res = await gmail.users.labels.list({ userId: 'me' })
  const labels = res.data.labels

  if (!labels || labels.length === 0) {
    console.log('No labels found.')
    return
  }

  console.log('Labels:')
  labels.forEach(label => {
    console.log(`- ${label.name}`)
  })
}

authorize()
  .then(listLabels)
  .catch(console.error)