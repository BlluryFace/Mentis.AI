import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import Db from "./pages/dashboard";
export default function Dashboard () {
	return (
		<html>
			<body>
				<Theme>
					<Db />
				</Theme>
			</body>
		</html>
	);
}
