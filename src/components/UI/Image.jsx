import * as React from 'react'
import { BlurImage } from '../blurImage'

const Image = (props) => {
    return(
        <div>
            <BlurImage
                img={
                    <img
                        src={props.src}
                        className={props.className}
                    />
                }
            />
        </div>
)};
export default Image;