import { useDisclosure, Flex, Button,  VStack, Text} from "@chakra-ui/react";
import { HamburgerIcon } from '@chakra-ui/icons'
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import { MyDrawer } from "./myDrawer";
import { MyButton } from "../myButton/myButton";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { store } from "../../store/store";

export const MobileDrawer = (props: any) =>  {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(store.getState().auth.isLoggedIn);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
        var storeLoggedIn = store.getState().auth.isLoggedIn;
        setIsLogin(storeLoggedIn);
    });

    return () => {
        unsubscribe();
    };
}, [dispatch]);

  const menuRenderer = () => {
    var menu = (isLogin) ? props.menuLinksLoggedIn : props.menuLinks;
    return menu.map((item: any, i: any) => {
      if(item.type == "button"){
        return (
              <MyButton key={i} textColor="white" 
                  backgroundColor="secondary.default" 
                  backgroundColorHover="secondary.dark" 
                  title={item.label}
                  fontSize="18px"
                  padding="20px"
                  onClick={()=>{item.onClick(); onToggle()}}></MyButton>
          );
      } else if(item.type == "linkButton") {
          return (
            <Text key={i} onClick={()=>{item.onClick(); onToggle()}} className={styles.menuLink}>
                {item.label}
            </Text>
          )
      } else {
          return (
              <Link key={i} to={(item.url) ? item.url : "/"} onClick={()=>{onToggle()}} className={styles.menuLink}>
                  {item.label}
              </Link>
          )
      }
    });
  }

  return (
    <Flex >
      <Button onClick={onOpen} bg={"primary.default"} _hover={{bg:"primary.light"}}>
        <HamburgerIcon boxSize={6} color={"white"}/>
      </Button>
      
      <MyDrawer
        isOpen={isOpen}
        onClose={onClose}>
        <VStack alignItems="left" spacing={8}>
          {menuRenderer()}
        </VStack>
      </MyDrawer>
    </Flex>
  );
};