import styles from './header.module.css'
import {  Image, Flex,  HStack , chakra, Hide, Text, Box, useToast, Link as ChakraLink } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { MobileDrawer } from './mobile-drawer';
import { useModal } from '../../config/modal/use-modal';
import { Modals } from '../../config/modal/modal-config';
import { MyButton } from '../myButton/myButton';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../store/store';
import { onLogout } from '../../store/auth/authAction';

export const Header = () => {
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(store.getState().auth.isLoggedIn);
    const navigate = useNavigate();
    const toast = useToast();
    const { pathname } = location;

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            var storeLoggedIn = store.getState().auth.isLoggedIn;
            setIsLogin(storeLoggedIn);
        });

        return () => {
            unsubscribe();
        };
    }, [dispatch]);

    const loginModal = useModal<any>(Modals.LoginModal);
    const displayLoginModal = () => {
        loginModal.open({
          onSave: () => {
            loginModal.close();
          },
          onClose: () => {
            loginModal.close();
          },
          onCancel: () => {
            loginModal.close();
          },
        });
    }

    const registerModal = useModal<any>(Modals.RegisterModal);
    const displayRegisterModal = () => {
        registerModal.open({
          onSave: () => {
            registerModal.close();
            toast({
                title: 'Gracias por registrarte! Ahora ya puedes anunciar tus entradas y comprar!',
                description: "",
                status: 'success',
                containerStyle: {
                    fontSize: "16px"
                },
                duration: 9000,
                isClosable: true,
            });
            navigate("mi-cuenta");
          },
          onClose: () => {
            registerModal.close();
          },
          onCancel: () => {
            registerModal.close();
          },
        });
    }

    const menuLinks = [
        {
            id: 2,
            label: "¿Cómo funciona?",
            url: "/como-funciona",
            type: "link"
        },
        {
            id: 1,
            label: "Nosotros",
            url: "/nosotros",
            type: "link"
        },
        {
            id: 4,
            label: "Sé un vendedor verificado",
            onClick: displayRegisterModal, 
            type: "button"
        },
        {
            id: 3,
            label: "Ingresar",
            onClick: displayLoginModal, 
            type: "linkButton"
        }
    ]

    const menuLinksLoggedIn = [
        {
            id: 3,
            label: "Tus entradas",
            url: "/mis-tickets",
            type: "link"
        },
        {
            id: 2,
            label: "Tu cuenta",
            url: "/mi-cuenta",
            type: "link"
        },
        {
            id: 1,
            label: "Vende tu entrada",
            type: "button",
            onClick: () => {navigate("/vender-ticket")}, 
        },
        {
            id: 4,
            label: "Salir",
            onClick: () => {
                dispatch(onLogout());
                if(pathname == "/vender-ticket" || pathname == "/mi-cuenta" || pathname == "/mis-tickets"){
                    navigate("/");
                }
            }, 
            type: "linkButton"
        }
    ]

    const menuRender = () =>{
        var menu = (isLogin) ? menuLinksLoggedIn : menuLinks;
        return menu.map((item, i) => {
            if(item.type == "button"){
                return (
                    <MyButton key={i} textColor="black" 
                        backgroundColor="gold.default" 
                        backgroundColorHover="gold.dark" 
                        title={item.label}
                        fontSize="18px"
                        padding="10px 15px"
                        onClick={item.onClick}
                        size='sm'></MyButton>
                );
            } else if(item.type == "linkButton") {
                return (
                    <Text key={i} onClick={item.onClick} className={styles.menuLink}>
                        {item.label}
                    </Text>
                )
            } else {
                return (
                    <Link key={i} to={(item.url) ? item.url : "/"} className={styles.menuLink}>
                        {item.label}
                    </Link>
                )
            }
        })
    }

    return (
        <chakra.header id="header" className={styles.header} padding={{"md": "0px 10px"}}>
            <Flex w="100%" px="6" py="5" align="center" justify="space-between">
                <Box>
                    <HStack cursor={"pointer"} onClick={()=>navigate("/")}>
                        <Hide below='sm'>
                            <Image src={"/images/logo_2.png"} 
                                   h="60px" 
                                   alt={`Logo de Ticketea.me`} 
                                   title={`Logo de Ticketea.me`}
                                   loading="eager"/>
                        </Hide>
                        <ChakraLink as={Link} to='/' style={{textDecoration:"none"}} fontSize={"26px"} fontFamily={"MontserratBold"}>ticketea</ChakraLink>
                    </HStack>
                </Box>
                <Hide below='md'>
                    <HStack as="nav" spacing={{"base": 1, "sm": 3, "lg": 5}}>
                        {menuRender()}
                    </HStack>
                </Hide>
                <Hide above='md'>
                    <MobileDrawer menuLinks={menuLinks} menuLinksLoggedIn={menuLinksLoggedIn}/>
                </Hide>
            </Flex>
        </chakra.header>
      );
};