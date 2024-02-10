import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    sizes: {
      custom: "10px",
    },
    breakpoints: {
      base: '0em',
      sm: '30em',
      md: '48em',
      lg: '62em',
      xl: '80em',
      customXl: '100em',
      customLg: '88em',
      customMd: '63em',
    },
    styles: {
      global: () => ({
        body: {
          bg: 'primary.default',
          color: "white"
        },
        '.chakra-modal__close-btn': {
          color: 'white',
        },
        '.chakra-modal__content': {
          borderTopLeftRadius: "custom !important",
          borderBottomLeftRadius: "custom !important"
        },
        html: {
          fontSize: "18px"
        },
      }),
    },
    radii:{
      custom: "0.625rem"
    },
    colors: {
      primary: {
        default: "#002E39",
        ligth: "#0F3942",
        half: "#002e3978",
        moreLight: "#1F434C"
      },
      secondary: {
        default: "#0093D3",
        half: "#0093d382",
        dark: "#0075a8"
      },
      white: {
        half: "#ffffff87",
        quarter: "#ffffff52"
      },
      green: {
        default: "#4CAF50"
      },
      red: {
        default: "#FF7777",
        dark: "#cc5f5f"
      },
      gold: {
        default: "#FFD700",
        dark: "#ccac00"
      },
      orange: {
        default: "#FF9800",
        dark: "#cc7900"
      },
      grey: {
        default: "#959595",
        dark: "#777777"
      }
    },
    fonts: {
      body: `'RobotoRegular', sans-serif`,
      robotoBold: `'RobotoBold', sans-serif`,
      monserratBold: `'MontserratBold', sans-serif`
    },
    components: {
        Badge:{
          variants: {
            green: {
              bg: "green.default",
              color: "white",
              textTransform: "none",
              borderRadius: "custom",
              paddingStart: "7px",
              paddingEnd: "7px",
              paddingTop: "2px",
              paddingBottom: "2px",
              fontWeight: "normal",
              fontSize: "14px"
            },
            red: {
              bg: "red.default",
              color: "white",
              textTransform: "none",
              borderRadius: "custom",
              paddingStart: "7px",
              paddingEnd: "7px",
              paddingTop: "2px",
              paddingBottom: "2px",
              fontWeight: "normal",
              fontSize: "14px"
            },
            gold: {
              bg: "gold.default",
              color: "black",
              textTransform: "none",
              borderRadius: "custom",
              paddingStart: "7px",
              paddingEnd: "7px",
              paddingTop: "2px",
              paddingBottom: "2px",
              fontWeight: "normal",
              fontSize: "14px",
              _hover: {
                backgroundColor: "gold.dark",
                transition: "all .3s ease-in-out",
              }
            },
            orange: {
              bg: "orange.default",
              color: "black",
              textTransform: "none",
              borderRadius: "custom",
              paddingStart: "7px",
              paddingEnd: "7px",
              paddingTop: "2px",
              paddingBottom: "2px",
              fontWeight: "normal",
              fontSize: "14px"
            },
            grey: {
              bg: "grey.default",
              color: "black",
              textTransform: "none",
              borderRadius: "custom",
              paddingStart: "7px",
              paddingEnd: "7px",
              paddingTop: "2px",
              paddingBottom: "2px",
              fontWeight: "normal",
              fontSize: "14px"
            }
          }
        },
        Input: {
          baseStyle: {
            "&[aria-invalid=true]": {
              borderColor: "red.500", // Color de borde cuando aria-invalid es true
            },
          },
          variants: {
            text: {
              field: {
                borderRadius: "custom",
                bg: "primary.moreLight",
                borderWidth: 2,
                borderColor: "primary.moreLight",
                _focus: {
                  borderColor: "secondary.default",
                },
                _invalid: { borderColor: 'red.default' },
                "::placeholder": {
                  color: "white.quarter",
                }
              },          
            },        
          },
          defaultProps: {
            variant: "text"
          }
        },
        Select: {
          baseStyle: {
            "&[aria-invalid=true]": {
              borderColor: "red.500", // Color de borde cuando aria-invalid es true
            },
          },
          variants: {
            text: {
              field: {
                borderRadius: "custom",
                bg: "primary.moreLight",
                borderWidth: 2,
                borderColor: "primary.moreLight",
                _focus: {
                  borderColor: "secondary.default",
                },
                _invalid: { borderColor: 'red.default' },
                "::placeholder": {
                  color: "white.half",
                }
              },          
            },        
          },
          defaultProps: {
            variant: "text"
          }
        },
        Drawer: {
          baseStyle: {
            dialog: {
              bg: 'primary.default',
            },
          },
          sizes: {
            xs: {
              dialog: {
                maxW: '15rem',
              },
            }
          }
        },
        DrawerCloseButton: {
          baseStyle: {
            bg: 'white',
            _hover: {
              bg: 'primary.light',
            },
          },
        },
    }
});

export default theme;