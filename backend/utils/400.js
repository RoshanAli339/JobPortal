const error404 = (res, errorMessage) => {
    return res.status(404).send({
        message: errorMessage,
    })
}

export default error404;