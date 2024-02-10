import { currentModal, CurrentModal } from "./current-modal";
import { useEffect, useState, Suspense } from "react";

export const ModalRenderer = () => {
    const [modal, updateCurrentModal] = useState<CurrentModal<any> | null>(null);
    useEffect(() => currentModal.subscribe(updateCurrentModal), []);

    if (modal) {
        const Modal = currentModal.get(modal.name);
        return <Suspense>
                <Modal { ...modal?.props } />
            </Suspense>
    }

    return null;
}