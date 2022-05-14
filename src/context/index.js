import { createContext } from "react";
import iconbutton from '../media/sounds/iconbutton.mp3';
import buttonsound from '../media/sounds/button.mp3';
import togglersound from '../media/sounds/toggle.mp3';

export const SoundContext = createContext(null);

export const VibrationContext = createContext(null);

export const Iconbuttonsound = createContext(iconbutton);

export const Buttonsound = createContext(buttonsound);

export const Togglersound = createContext(togglersound);