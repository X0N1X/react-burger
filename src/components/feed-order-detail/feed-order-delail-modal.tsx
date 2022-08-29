import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../modal/modal";
import { PageMain } from "../../pages/main";
import { FeedOrderDetail } from "./feed-order-detail";

export const FeedOrderDetailModal = () => {
    const navigate = useNavigate();

    const onClickClose = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <>
            <PageMain/>
            <Modal
                visible={true}
                title={"Состав заказа"}
                onClickClose={onClickClose}
            >
                <FeedOrderDetail/>
            </Modal>
        </>
    )
};