export const handleMessage = (req, res) => {
    const { message } = req.body;
    const responseMessage = `You said: ${message}`;
    res.json({ reply: responseMessage });
}