import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export const MyBigInputSearch = (props: Props) => {
    return (
        <InputGroup>
            <InputLeftElement height={{"base": "70px", "sm": "70px", "customMd": "100px"}} paddingLeft={"20px"}>
                <SearchIcon color='white.half' boxSize={{"base": 4, "sm": 4, "md": 6}}/>
            </InputLeftElement>
            <Input  placeholder='Busca aquí el evento por nombre o artista'
                        height={{"base": "70px", "sm": "70px", "customMd": "100px"}}
                        textAlign="center"
                        verticalAlign="middle"
                        fontSize={{"base": "20px", "sm": "20px", "customMd": "25px"}} 
                        backgroundColor={"#0a272e"}
                        borderColor={"#0a272e"}
                        defaultValue={props.value}
                        onKeyUp={(e)=>{props.setValue(e.currentTarget.value)}}/>
        </InputGroup>
    );
};

type Props = {
    value: string,
    setValue: any
};