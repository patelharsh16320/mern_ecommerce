const Home = (req, res) => {
    return res
        .status(200)
        .json({
            message: 'Welcome to Home page'
        });
}
const About = (req, res) => {
    return res
        .status(200)
        .json({
            message: 'Welcome to About page'
        });
}

module.exports = {
    Home, About
}