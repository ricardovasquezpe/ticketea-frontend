import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export const MyBigInputSearch = (props: Props) => {
    return (
        <InputGroup>
            <InputLeftElement height={{"base": "100px", "sm": "100px"}} paddingLeft={"20px"}>
                <SearchIcon color='white.half' boxSize={5}/>
            </InputLeftElement>
            <Input  placeholder='Buscar aquí el evento por nombre o artista'
                        height={{"base": "100px", "sm": "100px"}}
                        textAlign="center"
                        verticalAlign="middle"
                        fontSize={"25px"} 
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