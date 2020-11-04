import { createMuiTheme } from "@material-ui/core/styles";

const DeepPurpleTheme = createMuiTheme({
	palette: {
		primary: {
			// light: will be calculated from palette.primary.main,
			main: "#6a1b9a",
			dark: "#38006b",
			light: "#9c4dcc",
			contrastText: "#ffffff",
			// dark: will be calculated from palette.primary.main,
			// contrastText: will be calculated to contrast with palette.primary.main
		},
		secondary: {
			main: "#212121",
			dark: "#000000",
			light: "#484848",
			//     // dark: will be calculated from palette.secondary.main,
			contrastText: "#ffffff",
			//   },
			//   // Used by `getContrastText()` to maximize the contrast between
			//   // the background and the text.
			//   contrastThreshold: 3,
			//   // Used by the functions below to shift a color's luminance by approximately
			//   // two indexes within its tonal palette.
			//   // E.g., shift from Red 500 to Red 300 or Red 700.
			//   tonalOffset: 0.2,
		},
	}
}
);

export default DeepPurpleTheme;