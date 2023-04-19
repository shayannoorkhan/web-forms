import React from 'react'

const CommentBox = ({ comments }) => {
    return (
        <div className='box mt-3 mb-5'>
            <p style={{ fontSize: '15px' }} className="mb-3">Section Head Feedback</p>
            <div className='table-responsive'>
                <table className="table table-bordered table-striped ">
                    <thead>
                        <tr>
                            <td>Comments				</td>
                            <td>Feedback			</td>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {
                            comments?.map(data => {
                                return ( */}
                        <tr>
                            <td>{comments?.Comments}</td>
                            <td>{comments?.Feedback}</td>
                        </tr>
                        {/* )
                            })
                        } */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CommentBox