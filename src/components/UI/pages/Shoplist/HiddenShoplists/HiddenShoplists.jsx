import React, { useEffect } from 'react';
import List from '../../../List/List';

const HiddenShoplists = (props) => {
    return (
        <>
            {
                props.hidden.length > 0 &&
                <div className='mw500'>
                    <h3 className='mb-3 mt-3'>Скрытые списки</h3>
                    <List
                        theme={props.theme}
                        clickable
                    >
                        {
                            props.hidden.map((tab, index) =>
                                <li
                                    key={index}
                                    onClick={() => props.setHidden(props.hidden.filter((t) => t !== tab))}
                                    title={`Показать ${tab}`}
                                >
                                    {
                                        tab
                                    }
                                </li>
                            )
                        }
                    </List>
                </div>
            }
        </>
    );
};

export default HiddenShoplists;