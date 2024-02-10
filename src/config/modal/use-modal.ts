import {currentModal} from "./current-modal";
import {Modals} from "./modal-config";

export const useModal = <P,>(name: Modals) => {
 return {
  open: (props: P) => {
   currentModal.set({name, props: props})
  },
  close: () => {
   currentModal.set(null)
  },
 }
}