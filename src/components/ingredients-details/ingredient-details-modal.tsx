import IngredientDetails from "./ingredients-details";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../modal/modal";
import { PageMain } from "../../pages/main";

const IngredientDetailsModal = () => {
    const navigate = useNavigate();

    const onClickClose = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <>
            <PageMain/>
            <Modal
                visible={true}
                title={"Детали ингредиента"}
                onClickClose={onClickClose}
            >
                <IngredientDetails/>
            </Modal>
        </>
    )
};

export default IngredientDetailsModal