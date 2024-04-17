const Blog = require('../models/blog');

exports.postBlog = async (req, res, next) => {

    try{

        if (!req.body.title || !req.body.author || !req.body.content) {
            throw new Error("All fields are mandatory");
        }
        const {title, author, content} = req.body;


        console.log(title, author, content);

        await Blog.create({
            title: title,
            author: author,
            content: content
        })
        .then(response => res.status(200).json({ message: 'Expense added successfully!' }))
    } catch (err) {
        res.status(500).json({
            error: err,
            message: "error from postBlog"
        });
    }
    
};

exports.getAllBlog = async (req, res, next) => {
    try {
        await Blog.findAll()
        .then(result => {
            res.status(200).json( {blogs : result} );
        }).catch(err => console.log(err));

    }catch (err) {
        res.status(500).json({error : err.message});
    };
    
};

// exports.editExpense = async (req, res, next) => {
//     try {
//         const expenseId = req.params.Id;

//         await Expense.destroy({
//             where: {
//               id: expenseId
//             },
//           })
//         .then(result => {
//             res.status(200).json({data: result});
//         })
//     }catch (err) {
//         res.status(500).json({error : err.message, message: "error from editExpense"});
//     };
// };

// exports.deleteExpense = async (req, res, next) => {
//     try {
//         const expenseId = req.params.Id;

//         await Expense.destroy({
//             where: {
//               id: expenseId
//             },
//           })
//         .then(result => {
//             res.status(200).json({message: "Deleted Successfully"});
//         })
//     }catch (err) {
//         res.status(500).json({error : err.message});
//     };
// };