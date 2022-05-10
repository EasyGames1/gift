import React, { useEffect, useState } from 'react';
import Storage from '../../../../API/Storage';
import List from '../../List/List';
import HiddenShoplists from './HiddenShoplists/HiddenShoplists';
import MyShoplistEditor from './MyShoplistEditor/MyShoplistEditor';
import MyShoplistsData from './MyShoplistsData/MyShoplistsData';
import SoonShoplist from './SoonShoplist/SoonShoplist';

const Shoplist = (props) => {
    const [hidden, setHidden] = useState(
        Storage.getUserData('data')?.extended?.shoplist?.hidden ?
            Storage.getUserData('data')?.extended?.shoplist?.hidden : []
    );
    const [list, setList] = useState(
        Storage.getUserData('data')?.extended?.shoplist?.mylists ?
            Storage.getUserData('data')?.extended?.shoplist?.mylists :
            []
    );
    const [added, setAdded] = useState(false);

    useEffect(() => {
        if (added) {
            setAdded(false);
        };
    }, [added]);

    useEffect(() => {
        Storage.setUserData('data', {
            ...Storage.getUserData('data'),
            extended: {
                ...Storage.getUserData('data')?.extended,
                shoplist: {
                    ...Storage.getUserData('data')?.extended?.shoplist,
                    mylists: list
                }
            }
        });
        setHidden(hidden.filter((hid) => list.map((lis) => lis.title === hid).includes(true)))
    }, [list]);

    useEffect(() => {
        Storage.setUserData('data', {
            ...Storage.getUserData('data'),
            extended: {
                ...Storage.getUserData('data')?.extended,
                shoplist: {
                    ...Storage.getUserData('data')?.extended?.shoplist,
                    hidden: hidden
                }
            }
        });
    }, [hidden]);

    useEffect(() => {
        document.getElementById("title").textContent = "Список покупок";

        return () => {
            document.getElementById("title").textContent = "Подарок";
        };
    }, []);

    return (
        <div>
            <h1 className='text-center'>Список покупок</h1>
            <SoonShoplist
                theme={props.theme}
                newPurchase={props.newPurchase}
                hidden={hidden}
                setHidden={setHidden}
            />
            <MyShoplistEditor
                theme={props.theme}
                list={list}
                setList={setList}
                hidden={hidden}
                setHidden={setHidden}
                setAdded={setAdded}
            />
            <MyShoplistsData
                theme={props.theme}
                hidden={hidden}
                setHidden={setHidden}
                list={list}
                setList={setList}
                added={added}
            />
            <HiddenShoplists
                theme={props.theme}
                hidden={hidden}
                setHidden={setHidden}
            />
        </div>
    );
};

export default Shoplist;