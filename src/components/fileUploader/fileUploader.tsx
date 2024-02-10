import { Center, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from "./fileUploader.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

export const FileUploader = (props: Props) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        maxSize: 3000000,
        accept: {"application/pdf": [".pdf"]},
        onDrop: (acceptedFiles: any) => {
            setUploadedFiles(acceptedFiles);
        },
    });
    
    return (
        <Center className={styles.container} bg={(props.backgroundColor) ? props.backgroundColor : "transparent"}>
            <div className={styles.fileContainer} {...getRootProps()}>
                <input {...getInputProps()} />
                {(uploadedFiles.length == 0) && <Text className={styles.description}>{props.description}</Text>}
                    {uploadedFiles.map((file: any) => (
                        <VStack>
                            <FontAwesomeIcon icon={faFilePdf} size="3x"/>
                            <Text>{file.name}</Text>
                        </VStack>
                    ))}
            </div>
        </Center>
    );
};

type Props = {
    description: string,
    backgroundColor?: string
};