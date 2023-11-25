import { useParams } from 'react-router-dom';
import startImg from './../../Images/Yellow_Star.svg'
import { Link } from 'react-router-dom';

const QuestionsPage = () => {
    const {id} = useParams();

    return (  
    <div class="QuestionsPage">

        <div class="navbar">
        <Link to={`/product/${id}`}><div>About</div></Link>
        <Link to={`/product/${id}/specifications`}><div>Specifications</div></Link>
        <Link to={`/product/${id}/reviews`}><div>Reviews</div></Link>
        <a className='selected'><div>Questions</div></a>
    </div>

        <div class="review">
            <div class="name">Mr. Anderson</div>
            <div class="date">November 13, 2023</div>
            <div class="rating">
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
            </div>
            <div class="header">Would definitely buy again</div>
            <div class="text">For a refurbished item this unit is very good. I bought two for my granddaughters. Paid $14.48 each as compared to the price of new ones. Children are both 4 years old, so if they break them no harm no foul.</div>
        </div>

        <div class="review">
            <div class="name">TooYoungTooSimple</div>
            <div class="date">November 15, 2023</div>
            <div class="rating">
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
            </div>
            <div class="header">Great phone for the price</div>
            <div class="text">Not much bigger than my last phone, but way faster! Good price as I got it on sale. Has great features I'm still learning. Some really nice accessories too. Overall very pleased with his purchase Thx Noter!</div>
        </div>

        <div class="review">
            <div class="name">Mr. Anderson</div>
            <div class="date">November 13, 2023</div>
            <div class="rating">
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
            </div>
            <div class="header">Would definitely buy again</div>
            <div class="text">For a refurbished item this unit is very good. I bought two for my granddaughters. Paid $14.48 each as compared to the price of new ones. Children are both 4 years old, so if they break them no harm no foul.</div>
        </div>

        <div class="review">
            <div class="name">Mr. Anderson</div>
            <div class="date">November 13, 2023</div>
            <div class="rating">
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
            </div>
            <div class="header">Would definitely buy again</div>
            <div class="text">For a refurbished item this unit is very good. I bought two for my granddaughters. Paid $14.48 each as compared to the price of new ones. Children are both 4 years old, so if they break them no harm no foul.</div>
        </div>

        <div class="review">
            <div class="name">BRIEN</div>
            <div class="date">November 17, 2023</div>
            <div class="rating">
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
            </div>
            <div class="header">Easy phones</div>
            <div class="text">The Amazon package arrived quickly and was as ordered. The four handset phone system works well in our home. Good sound. Ergonomic. We have had good success with similar Panasonic phones in the past and are hopeful that these will be equally good.</div>
        </div>

        <div class="review">
            <div class="name">BRIEN</div>
            <div class="date">November 17, 2023</div>
            <div class="rating">
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
            </div>
            <div class="header">Easy phones</div>
            <div class="text">The Amazon package arrived quickly and was as ordered. The four handset phone system works well in our home. Good sound. Ergonomic. We have had good success with similar Panasonic phones in the past and are hopeful that these will be equally good.</div>
        </div>

        <div class="review">
            <div class="name">Norma hernandez</div>
            <div class="date">November 18, 2021</div>
            <div class="rating">
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
                <img src = {startImg} width="14.4px"/>
            </div>
            <div class="header">Would definitely buy again</div>
            <div class="text">For a refurbished item this unit is very good. I bought two for my granddaughters. Paid $14.48 each as compared to the price of new ones. Children are both 4 years old, so if they break them no harm no foul.</div>
        </div>

    </div>
    );
}
 
export default QuestionsPage;