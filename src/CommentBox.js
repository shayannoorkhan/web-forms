import { Button, Input, Select, message } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { baseUrl } from './helper'
import moment from 'moment'

const CommentBox = ({ comments, setComments, approvalBody }) => {

    const [loading, setLoading] = useState(false)

    function giveComments() {
        const obj = {
            "SubmissionNumber": approvalBody?.SubmissionNumber,
            "Comments": comments?.Comments,
            "Feedback": comments?.Feedback,
            "DateofFeedback": moment().format('YYYY-MM-DD'),
            "activeCode": approvalBody?.activeCode,
            "Form": approvalBody?.Form,
            "FormLink": approvalBody?.FormLink,
            "SectionHeadName": approvalBody?.SectionHeadName,
            "EvaluatorName": approvalBody?.EvaluatorName,
            "updated": moment().format('YYYY-MM-DD'),
            "flags": 0,
            "id": comments?.id ? comments?.id : 0
        }
        setLoading(true)
        if (obj?.id) {
            axios.put(`${baseUrl}sectionheadfeedback/${obj?.id ? obj?.id : 0}`, obj)
                .then((resp) => {
                    setLoading(false)
                    message.success('Feedback Submitted')
                }).catch((err) => {
                    setLoading(false)
                    message.error('Error')
                })
        } else {
            axios.post(`${baseUrl}sectionheadfeedback`, obj)
                .then((resp) => {
                    setLoading(false)
                    message.success('Feedback Submitted')
                }).catch((err) => {
                    setLoading(false)
                    message.error('Error')
                })
        }
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
                                        <Input value={comments?.Comments} onChange={(e) => setComments({ ...comments, 'Comments': e.target.value })} />
                                    </td>
                                    <td>
                                        <Select
                                            className='w-100'
                                            value={comments?.Feedback}
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