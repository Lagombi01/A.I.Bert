import Navigation from './navigation';
import AIBert from './chatbot.js'

export default function home(){
    return(
        <div>
            <Navigation />
            <AIBert />
        </div>
    );
}