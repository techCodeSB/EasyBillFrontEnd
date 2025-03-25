import React, { use, useState } from 'react'
import { Modal } from 'rsuite'
import useMyToaster from '../hooks/useMyToaster';
import { setData, toggle } from '../store/mailSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './Loading';
import { LuSend } from 'react-icons/lu';
import Cookies from 'js-cookie'



const MailModal = ({ open, pdf, email }) => {
    const [mailData, setMailData] = useState({ subject: "", body: "" })
    const toast = useMyToaster();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();


    const sendMail = async () => {
        if (mailData.subject === "" || mailData.body === "" || pdf === "") {
            return toast("Please fill all fields", "error");
        }


        try {
            setLoading(true)
            const url = process.env.REACT_APP_API_URL + '/user/send-bill';
            const req = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    token: Cookies.get("token"),
                    data: pdf,
                    email: email,
                    subject: mailData.subject,
                    body: mailData.body,
                })
            });
            const res = await req.json();
            setLoading(false);

            if (req.status !== 200 && !res.send) {
                return toast("Email not sent", "error");
            }

            return toast("Email sent", "success");
            
        } catch (error) {
            console.log(error)
            toast("Mail not send", 'error')
        }


    }



    return (
        <div className='mail__modal'>
            <Modal open={open} onClose={() => {
                dispatch(toggle(false));
            }}>
                <Modal.Header>
                    <p>Mail</p>
                </Modal.Header>
                <Modal.Body className='flex flex-col gap-2 mail__body'>
                    <div className=''>
                        <p>To</p>
                        <input type="text" value={email} onChange={null} disabled />
                    </div>

                    <div>
                        <p className='mb-2'>Subject</p>
                        <input type="email"
                            value={mailData.subject}
                            onChange={(e) => setMailData({ ...mailData, subject: e.target.value })} />
                    </div>

                    <div>
                        <p>Body</p>
                        <textarea rows={5}
                            value={mailData.body}
                            onChange={(e) => setMailData({ ...mailData, body: e.target.value })}
                        ></textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        onClick={sendMail}
                        className='flex items-center gap-1 bg-orange-600 text-white rounded-[5px] p-2'
                    >
                        {loading ? <Loading /> : <LuSend />}
                        Send
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default MailModal