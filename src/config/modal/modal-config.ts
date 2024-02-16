import React, {LazyExoticComponent} from "react";

export enum Modals {
 LoadingModal,
 RatingDetailsModal,
 FinishPaymentModal,
 TicketeaProtectModal,
 LoginModal,
 RegisterModal,
 ValidatePhoneModal,
 ValidateEmailModal,
 ValidatePersonalDocModal,
 ConfirmTicketModal,
 RequestRefundModal,
 EditTicketPriceModal,
 ChangeProfilePhotoModal,

 DeleteTicketDialog,
 ConfirmUserUpdateDailog
}

export const modalsConfig: Record<Modals, LazyExoticComponent<any>> = {
    [Modals.LoadingModal]: React.lazy(() => import('../../components/myModal/loadingModal/loadingModal').then((module) => ({
        default: module.LoadingModal,
    }))),
    [Modals.RatingDetailsModal]: React.lazy(() => import('../../components/myModal/ratingDetailModal/ratingDetailsModal').then((module) => ({
        default: module.RatingDetailModal,
    }))),
    [Modals.FinishPaymentModal]: React.lazy(() => import('../../components/myModal/finishPaymentModal/finishPaymentModal').then((module) => ({
        default: module.FinishPaymentModal,
    }))),
    [Modals.TicketeaProtectModal]: React.lazy(() => import('../../components/myModal/ticketeaProtectModal/ticketeaProtectModal').then((module) => ({
        default: module.TicketeaProtectModal,
    }))),
    [Modals.LoginModal]: React.lazy(() => import('../../components/myModal/loginModal/loginModal').then((module) => ({
        default: module.LoginModal,
    }))),
    [Modals.RegisterModal]: React.lazy(() => import('../../components/myModal/registerModal/registerModal').then((module) => ({
        default: module.RegisterModal,
    }))),
    [Modals.ValidatePhoneModal]: React.lazy(() => import('../../components/myModal/validatePhoneModal/validatePhoneModal').then((module) => ({
        default: module.ValidatePhoneModal,
    }))),
    [Modals.ValidateEmailModal]: React.lazy(() => import('../../components/myModal/validateEmail/validateEmailModal').then((module) => ({
        default: module.ValidateEmailModal,
    }))),
    [Modals.ValidatePersonalDocModal]: React.lazy(() => import('../../components/myModal/validatePersonalDocModal/validatePersonalDocModal').then((module) => ({
        default: module.ValidatePersonalDocModal,
    }))),
    [Modals.ConfirmTicketModal]: React.lazy(() => import('../../components/myModal/confirmTicketModal/confirmTicketModal').then((module) => ({
        default: module.ConfirmTicketModal,
    }))),
    [Modals.RequestRefundModal]: React.lazy(() => import('../../components/myModal/requestRefundModal/requestRefundModal').then((module) => ({
        default: module.RequestRefundModal,
    }))),
    [Modals.EditTicketPriceModal]: React.lazy(() => import('../../components/myModal/editTicketPriceModal/editTicketPriceModal').then((module) => ({
        default: module.EditTicketPriceModal,
    }))),
    [Modals.ChangeProfilePhotoModal]: React.lazy(() => import('../../components/myModal/changeProfilePhotoModal/changeProfilePhotoModal').then((module) => ({
        default: module.changeProfilePhotoModal,
    }))),
    [Modals.DeleteTicketDialog]: React.lazy(() => import('../../components/myDialog/deleteTicketDialog/deleteTicketDialog').then((module) => ({
        default: module.DeleteTicketDialog,
    }))),
    [Modals.ConfirmUserUpdateDailog]: React.lazy(() => import('../../components/myDialog/confirmUserUpdateDialog/confirmUserUpdateDialog').then((module) => ({
        default: module.ConfirmUserUpdateDialog,
    })))
}