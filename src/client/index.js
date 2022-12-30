

import { formHnadler } from "../client/js/submitHandler"
import { UpdateUI } from "../client/js/udUi"


import './styles/root.scss';

document.getElementById("generate").addEventListener("click", formHnadler);

export {
    formHnadler,
    UpdateUI
}