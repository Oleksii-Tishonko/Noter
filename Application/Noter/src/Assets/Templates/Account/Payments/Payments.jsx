import {useContext, useState} from "react";
import "./Payments.css";
import {useEffect} from "react";
import RestAPI from "../../../Scripts/RestAPI";
import globals from "../../../../globals";

const Payments = ({userdata}) => {
    const [isEditCardPopupOpen, setIsEditCardPopupOpen] = useState(false);
    const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
    const [creditCardEditing, setCreditCardEditing] = useState(null);
    const [creditCards, setCreditCards] = useState(null);

    useEffect(() => {
        if (userdata) {
            setCreditCards(userdata.creditCards);
        }
    }, [userdata]);

    function EditCard(creditCard) {
        setCreditCardEditing(creditCard);
        setIsEditCardPopupOpen(true);
    }

    return (
        <div className="payments">
            <div>This is the payments page content. There you can find your payment history and add new payment methods</div>
            {!userdata && <div>Loading...</div>}
            {userdata && (
                <div className="creditCards">
                    {creditCards &&
                        creditCards.map((creditCard) => (
                            <div className="creditCard" key={creditCard.cardName}>
                                <div className="name">{creditCard.cardName}</div>
                                <div className="edit" onClick={() => EditCard(creditCard)}>
                                    Edit
                                </div>
                            </div>
                        ))}
                    <div className="addCreditCard" onClick={() => setIsAddCardPopupOpen(true)}>
                        Add Creadit Card
                    </div>
                </div>
            )}
            {isEditCardPopupOpen && <EditCreditCard userId={userdata._id} creditCard={creditCardEditing} closePopup={() => setIsEditCardPopupOpen(false)} />}
            {isAddCardPopupOpen && <AddCreditCard userId={userdata._id} closePopup={() => setIsAddCardPopupOpen(false)} />}
        </div>
    );
};

const EditCreditCard = ({userId, creditCard, setCreditCard, closePopup}) => {
    const [_creditCard, _setCreditCard] = useState(creditCard.cardName);
    function OnCreditCardChange(e) {
        const newCreditCard = e.target.value;
        _setCreditCard(newCreditCard);
    }

    function SaveChanges() {
        const restAPI = new RestAPI();
        restAPI.UpdateData(`${globals.DATABASE}/api/v1/users/${userId}/creditCards/${creditCard._id}`, {cardName: _creditCard}, OnCreditCardUpdated);

        closePopup();
    }

    function DeleteCard() {
        const restAPI = new RestAPI();
        restAPI.DeleteData(`${globals.DATABASE}/api/v1/users/${userId}/creditCards/${creditCard._id}`, OnCreditCardDeleted);

        closePopup();
    }

    function OnCreditCardUpdated(data, status, error) {
        console.log("Credit card update server responce" + status);
        console.log(data);
        if (status != "OK") {
            alert("Error updating credit card: " + error);
        }

        window.location.reload();
    }

    function OnCreditCardDeleted(data, status, error) {
        console.log("Credit card delete server responce" + status);

        if (status != "OK") {
            alert("Error deleting credit card: " + error);
        }

        window.location.reload();
    }

    return (
        <div className="editCreditCard">
            <div className="background" onClick={() => closePopup()}></div>
            <div className="popup">
                <input type="text" value={_creditCard} onChange={(e) => OnCreditCardChange(e)} />
                <div className="actionButtons">
                    <div className="save" onClick={() => SaveChanges()}>
                        Save
                    </div>
                    <div className="delete" onClick={() => DeleteCard()}>
                        Delete
                    </div>
                    <div className="cancel" onClick={() => closePopup()}>
                        Cancel
                    </div>
                </div>
            </div>
        </div>
    );
};
const AddCreditCard = ({userId, closePopup}) => {
    const [creditCard, setCreditCard] = useState(null);

    function OnCreditCardChange(e) {
        const newCreditCard = e.target.value;
        setCreditCard(newCreditCard);
    }

    function CreateCard() {
        const restAPI = new RestAPI();
        restAPI.PostData(`${globals.DATABASE}/api/v1/users/${userId}/creditCards`, {cardName: creditCard}, OnCreditCardCreated);

        closePopup();
    }

    function OnCreditCardCreated(data, status, error) {
        console.log("Credit card creation server responce" + status);
        console.log(data);
        if (status != "OK") {
            alert("Error creating credit card: " + error);
        }
        window.location.reload();
    }

    return (
        <div className="editCreditCard">
            <div className="background" onClick={() => closePopup()}></div>
            <div className="popup">
                <input type="text" placeholder="Enter card name..." value={creditCard} onChange={(e) => OnCreditCardChange(e)} />
                <div className="actionButtons">
                    <div className="save add" onClick={() => CreateCard()}>
                        Add
                    </div>
                    <div className="cancel" onClick={() => closePopup()}>
                        Cancel
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payments;
