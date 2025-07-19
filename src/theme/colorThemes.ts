declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      text: string;
      input: string;
      background: string;
      elements: string;
    };
    typography: {
      fontFamily: string;
      fontWeightLight: number;
      fontWeightSemibold: number;
      fontWeightBold: number;
      fontSizeHome: string;
      fontSizeDetail: string;
    };
  }
}


export const lightTheme = {
  color: {
    text: "hsl(200, 15%, 8%)",
    input: "hsl(0, 100%, 100%)",
    background: "hsl(0, 0%, 99%)",
    elements: "hsl(0, 100%, 100%)",
  },
  typography: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeightLight: 300,
    fontWeightSemibold: 600,
    fontWeightBold: 800,
    fontSizeHome: "0.875rem", // 14px
    fontSizeDetail: "1rem", // 16px
  },
};

export const darkTheme = {
  color: {
    text: "hsl(0, 100%, 100%)",
    input: "hsl(209, 23%, 22%)",
    background: "hsl(207, 26%, 17%)",
    elements: "hsl(209, 23%, 22%)",
  },
  typography: {
    fontFamily: "Nunito Sans, sans-serif",
    fontWeightLight: 300,
    fontWeightSemibold: 600,
    fontWeightBold: 800,
    fontSizeHome: "0.875rem", // 14px
    fontSizeDetail: "1rem", // 16px
  },
};