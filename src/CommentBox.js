import { Button, Input, Select, message } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { baseUrl } from './helper'
import moment from 'moment'

const CommentBox = ({ comments, setComments }) => {

    const [loading, setLoading] = useState(false)

    function giveComments() {
        comments.DateofFeedback = moment().format('YYYY-MM-DD')
        comments.updated = moment().format('YYYY-MM-DD')
        setLoading(true)
        axios.put(`${baseUrl}sectionheadfeedback/${comments?.id ? comments?.id : 0}`, comments)
            .then((resp) => {
                setLoading(false)
                message.success('Feedback Submitted')
            }).catch((err) => {
                setLoading(false)
                message.erorr('Error')
            })
    }

    return (
        <div className='box mt-3 mb-5'>
            <p style={{ fontSize: '15px' }} className="mb-3">Section Head Feedback</p>
            <div className='table-responsive'>
                <table className="table table-bordered table-striped ">
                    <thead>
                        <tr>
                            <td>Comments				</td>
                            <td>Feedback			</td>
                            {
                                comments?.DateofFeedback &&
                                <td>Date of Feedback</td>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            window.location.href.includes('shmode') ?
                                <tr>
                                    <td>
                                        <Input onChange={(e) => setComments({ ...comments, 'Comments': e.target.value })} />
                                    </td>
                                    <td>
                                        <Select
                                            className='w-100'
                                            options={[
                                                { label: 'Approved', value: 'Approved' },
                                                { label: 'Rejected', value: 'Rejected' }
                                            ]}
                                            onChange={(e) => setComments({ ...comments, 'Feedback': e })}
                                        />
                                    </td>
                                    {
                                        comments?.DateofFeedback &&
                                        <td>{moment(comments?.DateofFeedback).format('YYYY-MM-DD')}</td>
                                    }
                                </tr>
                                :

                                <tr>
                                    <td>{comments?.Comments}</td>
                                    <td>{comments?.Feedback}</td>
                                    {
                                        comments?.DateofFeedback &&
                                        <td>{moment(comments?.DateofFeedback).format('YYYY-MM-DD')}</td>
                                    }
                                </tr>
                        }
                    </tbody>
                </table>
                {
                    window.location.href.includes('shmode') &&
                    <Button className='form-button' loading={loading} disabled={loading} onClick={giveComments}>
                        Submit Feedback
                    </Button>
                }

            </div>
        </div>
    )
}

export default CommentBox