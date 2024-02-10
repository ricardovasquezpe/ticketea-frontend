import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import styles from "./rating.module.css";
import { HStack } from '@chakra-ui/layout';

export const Rating = (props: Props) => {
    const [rating, setRating] = useState(null as any);
    const [hover, setHover] = useState(null as any);

    const clickStar = (currentRating: any) => {
        setRating(currentRating);
        props.onClick(currentRating);
    }

    return (
        <div>
            <HStack gap={0.5}>
                { [...Array(5)].map((_, index) => {
                    const currentRating = index + 1;
                    return (
                        <label key={index}>
                            <input 
                                type="radio" 
                                name='rating' 
                                value={currentRating} 
                                onClick={()=>clickStar(currentRating)}/>
                            <FontAwesomeIcon 
                                icon={faStar} 
                                size="1x" 
                                className={styles.star}
                                color={currentRating <= (hover || rating) ? "gold" : "grey"}
                                onMouseEnter={()=>setHover(currentRating)}
                                onMouseLeave={()=>setHover(null)}/>
                        </label>
                    );
                })}
            </HStack>
        </div>
    );
};

type Props = {
    onClick: (rate: number) => void
};