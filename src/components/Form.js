import React, { useEffect, useState} from 'react';
import Socket from './SocketIo'
const Form = (props) => {

    //Socket.emit('connection',"hola mundo")

    const [user, setUser] = useState('')
    const [check, setCheck] = useState(false)
    const [msj, setMsj] = useState({content:''})
    const [notification, setNotification] = useState(-200)
    const [notText,setNotText]=useState('');
    const [scale, setScale] = useState({scale:1,pos:'relative',r:'0'})

    useEffect(()=>{
        Socket.on('chat_welcome',(data)=>{
            console.log(data)
            setNotification(0);
            setNotText(data.msj)
            setTimeout(()=>{
                setNotification(-200)
            },1200)
        })
    })

    const onChat=(e)=>{
        e.preventDefault();
        if(user.length<4){
            alert('no puede tener menos de 4 caracteres el nombre')
            return;
        }
        setCheck(true)
        setScale({scale:0,pos:'absolute',r:'500'})
        Socket.emit('chat_name',{name:user})
        
    }
    
    const sendMsj=(e)=>{
        e.preventDefault();
        console.log(msj.content)
    }

    return (
        <>
            <div className='notify' style={{transform:`translateX(${notification}%)`}}>
                <p>Notification {notText}</p>
            </div>
            <h1>Chat Anonimo con React</h1>
            <form onSubmit={onChat} className="name-user" style={{transform:`scale(${scale.scale})`,position:`${scale.pos}`,right:`${scale.r}`}}>
                <input name='user' 
                        value={user} 
                        onChange={(e) => setUser(e.target.value)} 
                        disabled={check}
                        placeholder={'Write your nickname'}
                        />
                <button><span>Get Started</span></button>
            </form>
            <div className="chat-containt">
                <div className="section_p">
                    <div className="user_circle">
                    
                    </div>
                    <p>Aqui van los mensajes</p>
                </div>
                <form onSubmit={sendMsj}>
                    <input name="content" value={msj.content} onChange={(e)=>{
                        setMsj({
                            ...msj,
                            [e.target.name]:e.target.value
                        })
                    }}/>
                    <button>send</button>
                </form>
            </div>
        </>
    );
}
export default Form;