import React, { Component } from 'react'

export default class Popup extends Component {
    render() {
        const { children, onClose, isShow = false } = this.props;
        return (
            isShow &&
            <>
                <div onClick={onClose} className='fixed top-0 left-0 w-full h-screen bg-black/50 z-40'></div>
                <div className='z-40 fixed top-1/2 left-1/2 -translate-1/2 popup-animation'>
                    {children}
                </div>
            </>
        )
    }
}
