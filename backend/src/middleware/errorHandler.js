// Custom error classes
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

class ValidationError extends AppError {
    constructor(message) {
        super(message, 400);
    }
}

class NotFoundError extends AppError {
    constructor(message) {
        super(message, 404);
    }
}

class UnauthorizedError extends AppError {
    constructor(message) {
        super(message, 401);
    }
}

class ForbiddenError extends AppError {
    constructor(message) {
        super(message, 403);
    }
}

class ConflictError extends AppError {
    constructor(message) {
        super(message, 409);
    }
}

// Centralized error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Default error
    let error = {
        message: err.message || 'Erreur interne du serveur',
        statusCode: err.statusCode || 500,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    };

    // Handle specific error types
    if (err.name === 'ValidationError') {
        error.statusCode = 400;
        error.message = err.message;
    }

    if (err.name === 'CastError') {
        error.statusCode = 400;
        error.message = 'Format de données invalide';
    }

    if (err.code === '23505') { // PostgreSQL unique violation
        error.statusCode = 409;
        error.message = 'Cette donnée existe déjà';
    }

    if (err.code === '23503') { // PostgreSQL foreign key violation
        error.statusCode = 400;
        error.message = 'Référence invalide';
    }

    if (err.code === '23502') { // PostgreSQL not null violation
        error.statusCode = 400;
        error.message = 'Champ requis manquant';
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        error.statusCode = 401;
        error.message = 'Token invalide';
    }

    if (err.name === 'TokenExpiredError') {
        error.statusCode = 401;
        error.message = 'Token expiré';
    }

    res.status(error.statusCode).json({
        error: error.message,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
};

// Async handler wrapper to catch errors in async functions
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

// 404 handler
const notFoundHandler = (req, res, next) => {
    const error = new NotFoundError(`Route non trouvée: ${req.originalUrl}`);
    next(error);
};

module.exports = {
    AppError,
    ValidationError,
    NotFoundError,
    UnauthorizedError,
    ForbiddenError,
    ConflictError,
    errorHandler,
    asyncHandler,
    notFoundHandler
};
