/*
 * Project: pocket-poll
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 28.06.2022
 * Time: 14:14
*/

import Button, {IButtonProps} from "../shared/components/Button/Button";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import {MdSave} from "react-icons/md";
import {HiShare} from "react-icons/hi";

/* <--- Create element ---> */
export default {
    title: 'Shared/Button',
    component: Button,
    argTypes: {onClick: {action: 'onClick'}}
} as ComponentMeta<typeof Button>;

/* <--- Create story ---> */
const T: ComponentStory<typeof Button> = (args: IButtonProps) => <Button {...args} />;

/* <--- Save version ---> */
export const Save = T.bind({} as IButtonProps)
Save.args = {
    icon: <MdSave />,
    text: 'Zapisz',
    disabled: false,
    className: ''
}

/* <--- Share version ---> */
export const Share = T.bind({} as IButtonProps)
Share.args = {
    icon: <HiShare />,
    text: 'Udostępnij',
    disabled: true,
    className: ''
}