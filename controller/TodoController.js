import ErrorHandler from "../errorHandler/errorHandler.js";
import Todo from "../models/Todo.js";
import User from "../models/User.js";


export const createTodo = async (req, res, next) => {
  try {
      if(req.body.title === '' || req.body.description === ''){
        next(ErrorHandler.validationError('All fields are required.'));
        return;
      }
    const todo = await new Todo(req.body);
    todo.save();

    return res.status(200).json("Todo saved successfully");
  } catch (error) {
    next(
      ErrorHandler.internalServerError(
        "Internal server error, Please try again."
      )
    );
  }
};

export const getAllTodos = async (req, res, next) => {
  let username = req.query.username;
  let todos;
  try {
    if (username) {
    const user = await User.findOne({username : username});

      todos = await Todo.find({
        author : user._id
      }).sort({ createDate: -1 }).populate('author').exec();
    }

    return res.status(200).json(todos);
  } catch (error) {
    next(
      ErrorHandler.internalServerError(
        "Internal server error, Please reload the page."
      )
    );
  }
};

export const getTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id).populate('author').exec();

    return res.status(200).json(todo);
  } catch (error) {
    next(
      ErrorHandler.internalServerError(
        "Internal server error, Please try again."
      )
    );
  }
};

export const updateTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      next(ErrorHandler.notFoundError("Todo not found !!"));
      return;
    }

    await Todo.findByIdAndUpdate(req.params.id, { $set: req.body});
    return res.status(200).json({ msg: "todo updated successfully" });
  } catch (error) {
    next(
      ErrorHandler.internalServerError(
        "Internal server error, Please try again."
      ) 
    );
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      next(ErrorHandler.notFoundError("Todo not found !!"));
      return;
    }

    await todo.deleteOne();
    return res.status(200).json({ msg: "todo deleted successfully" });
  } catch (error) {
    next(
      ErrorHandler.internalServerError(
        "Internal server error, Please try again."
      )
    );
  }
};



