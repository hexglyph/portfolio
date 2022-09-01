import clientPromise from "../../../lib/mongodb"

export default async function handler(req, res) {
    try {
        const client = await clientPromise
        const { slug } = req.body
        const admins = await client.collection('admin').get()
        const adminData = admins.docs.map(doc => doc.data())

        const portfolio = await client.collection('portfolio').get()
        const portfolioData = portfolio.docs.map(doc => doc.data())

        const portfolioAdmin = portfolioData.filter(portfolio => portfolio.admin && portfolio.admin.length > 0 && portfolio.admin.filter(admin => admin.slug === slug).length > 0)

        if (adminData.some(doc => doc.slug === slug)) {
            res.status(400).end()
        } else {
            const { id } = await client.collection('admin').add({
                ...req.body,
                created: new Date().toISOString(),
            })
            res.status(200).json({ id })
        }
    } catch (error) {
        console.log(error)
        res.status(400).end()
    }
}
