const { body, param, validationResult } = require('express-validator');

// Validation middleware
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Validation schemas
const utilisateurValidation = {
    create: [
        body('email').isEmail().normalizeEmail().withMessage('Email invalide'),
        body('mot_de_passe').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
        body('nom').trim().notEmpty().withMessage('Le nom est requis'),
        body('prenom').trim().notEmpty().withMessage('Le prénom est requis'),
        body('role').isIn(['etudiant', 'professeur', 'administrateur']).withMessage('Rôle invalide'),
        validate
    ],
    update: [
        body('email').optional().isEmail().normalizeEmail().withMessage('Email invalide'),
        body('mot_de_passe').optional().isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
        body('nom').optional().trim().notEmpty().withMessage('Le nom ne peut pas être vide'),
        body('prenom').optional().trim().notEmpty().withMessage('Le prénom ne peut pas être vide'),
        body('role').optional().isIn(['etudiant', 'professeur', 'administrateur']).withMessage('Rôle invalide'),
        validate
    ],
    id: [
        param('id').toInt().isInt().withMessage('ID invalide'),
        validate
    ]
};

const etudiantValidation = {
    create: [
        body('email').isEmail().normalizeEmail().withMessage('Email invalide'),
        body('mot_de_passe').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
        body('nom').trim().notEmpty().withMessage('Le nom est requis'),
        body('prenom').trim().notEmpty().withMessage('Le prénom est requis'),
        body('numero_etudiant').trim().notEmpty().withMessage('Le numéro étudiant est requis'),
        body('filiere').trim().notEmpty().withMessage('La filière est requise'),
        body('niveau_etude').optional().trim(),
        validate
    ],
    update: [
        body('email').optional().isEmail().normalizeEmail().withMessage('Email invalide'),
        body('mot_de_passe').optional().isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
        body('nom').optional().trim().notEmpty().withMessage('Le nom ne peut pas être vide'),
        body('prenom').optional().trim().notEmpty().withMessage('Le prénom ne peut pas être vide'),
        body('numero_etudiant').optional().trim().notEmpty().withMessage('Le numéro étudiant ne peut pas être vide'),
        body('filiere').optional().trim().notEmpty().withMessage('La filière ne peut pas être vide'),
        body('niveau_etude').optional().trim(),
        validate
    ],
    id: [
        param('id').toInt().isInt().withMessage('ID invalide'),
        validate
    ]
};

const professeurValidation = {
    create: [
        body('email').isEmail().normalizeEmail().withMessage('Email invalide'),
        body('mot_de_passe').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
        body('nom').trim().notEmpty().withMessage('Le nom est requis'),
        body('prenom').trim().notEmpty().withMessage('Le prénom est requis'),
        body('specialite').trim().notEmpty().withMessage('La spécialité est requise'),
        body('departement').trim().notEmpty().withMessage('Le département est requis'),
        body('grade').optional().trim(),
        validate
    ],
    update: [
        body('email').optional().isEmail().normalizeEmail().withMessage('Email invalide'),
        body('mot_de_passe').optional().isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
        body('nom').optional().trim().notEmpty().withMessage('Le nom ne peut pas être vide'),
        body('prenom').optional().trim().notEmpty().withMessage('Le prénom ne peut pas être vide'),
        body('specialite').optional().trim().notEmpty().withMessage('La spécialité ne peut pas être vide'),
        body('departement').optional().trim().notEmpty().withMessage('Le département ne peut pas être vide'),
        body('grade').optional().trim(),
        validate
    ],
    id: [
        param('id').toInt().isInt().withMessage('ID invalide'),
        validate
    ]
};

const laboratoireValidation = {
    create: [
        body('nom').trim().notEmpty().withMessage('Le nom du laboratoire est requis'),
        body('description').optional().trim(),
        body('responsable_id').optional().isInt().withMessage('ID responsable invalide'),
        validate
    ],
    update: [
        body('nom').optional().trim().notEmpty().withMessage('Le nom ne peut pas être vide'),
        body('description').optional().trim(),
        body('responsable_id').optional().isInt().withMessage('ID responsable invalide'),
        validate
    ],
    id: [
        param('id').toInt().isInt().withMessage('ID invalide'),
        validate
    ]
};

const travailPratiqueValidation = {
    create: [
        body('titre').trim().notEmpty().withMessage('Le titre est requis'),
        body('description').trim().notEmpty().withMessage('La description est requise'),
        body('professeur_id').isInt().withMessage('ID professeur invalide'),
        body('statut').optional().isIn(['planifie', 'en_cours', 'termine', 'annule']).withMessage('Statut invalide'),
        body('date_debut').optional().isISO8601().withMessage('Date début invalide'),
        body('date_fin').optional().isISO8601().withMessage('Date fin invalide'),
        validate
    ],
    update: [
        body('titre').optional().trim().notEmpty().withMessage('Le titre ne peut pas être vide'),
        body('description').optional().trim().notEmpty().withMessage('La description ne peut pas être vide'),
        body('professeur_id').optional().isInt().withMessage('ID professeur invalide'),
        body('statut').optional().isIn(['planifie', 'en_cours', 'termine', 'annule']).withMessage('Statut invalide'),
        body('date_debut').optional().isISO8601().withMessage('Date début invalide'),
        body('date_fin').optional().isISO8601().withMessage('Date fin invalide'),
        validate
    ],
    id: [
        param('id').toInt().isInt().withMessage('ID invalide'),
        validate
    ]
};

const articleRechercheValidation = {
    create: [
        body('titre').trim().notEmpty().withMessage('Le titre est requis'),
        body('resume').trim().notEmpty().withMessage('Le résumé est requis'),
        body('auteur_id').isInt().withMessage('ID auteur invalide'),
        body('statut').optional().isIn(['brouillon', 'soumis', 'publie', 'refuse']).withMessage('Statut invalide'),
        body('date_publication').optional().isISO8601().withMessage('Date publication invalide'),
        validate
    ],
    update: [
        body('titre').optional().trim().notEmpty().withMessage('Le titre ne peut pas être vide'),
        body('resume').optional().trim().notEmpty().withMessage('Le résumé ne peut pas être vide'),
        body('auteur_id').optional().isInt().withMessage('ID auteur invalide'),
        body('statut').optional().isIn(['brouillon', 'soumis', 'publie', 'refuse']).withMessage('Statut invalide'),
        body('date_publication').optional().isISO8601().withMessage('Date publication invalide'),
        validate
    ],
    id: [
        param('id').toInt().isInt().withMessage('ID invalide'),
        validate
    ]
};

const administrateurValidation = {
    create: [
        body('email').isEmail().normalizeEmail().withMessage('Email invalide'),
        body('mot_de_passe').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
        body('nom').trim().notEmpty().withMessage('Le nom est requis'),
        body('prenom').trim().notEmpty().withMessage('Le prénom est requis'),
        body('niveau_acces').optional().isIn(['super', 'standard']).withMessage('Niveau invalide (super ou standard)'),
        validate
    ],
    update: [
        body('email').optional().isEmail().normalizeEmail().withMessage('Email invalide'),
        body('mot_de_passe').optional().isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
        body('nom').optional().trim().notEmpty().withMessage('Le nom ne peut pas être vide'),
        body('prenom').optional().trim().notEmpty().withMessage('Le prénom ne peut pas être vide'),
        body('niveau_acces').optional().isIn(['super', 'standard']).withMessage('Niveau invalide (super ou standard)'),
        validate
    ],
    id: [
        param('id').toInt().isInt().withMessage('ID invalide'),
        validate
    ]
};

const evaluationValidation = {
    create: [
        body('soumission_id').isInt().withMessage('ID soumission invalide'),
        body('professeur_id').isInt().withMessage('ID professeur invalide'),
        body('note').isFloat({ min: 0, max: 20 }).withMessage('La note doit être entre 0 et 20'),
        body('commentaire').optional().trim(),
        validate
    ],
    update: [
        body('note').optional().isFloat({ min: 0, max: 20 }).withMessage('La note doit être entre 0 et 20'),
        body('commentaire').optional().trim(),
        validate
    ],
    id: [
        param('id').toInt().isInt().withMessage('ID invalide'),
        validate
    ]
};

const experienceValidation = {
    create: [
        body('titre').trim().notEmpty().withMessage('Le titre est requis'),
        body('description').trim().notEmpty().withMessage('La description est requise'),
        body('travail_pratique_id').isInt().withMessage('ID travail pratique invalide'),
        body('difficulte').optional().trim(),
        validate
    ],
    update: [
        body('titre').optional().trim().notEmpty().withMessage('Le titre ne peut pas être vide'),
        body('description').optional().trim().notEmpty().withMessage('La description ne peut pas être vide'),
        body('difficulte').optional().trim(),
        validate
    ],
    id: [
        param('id').toInt().isInt().withMessage('ID invalide'),
        validate
    ]
};

const notificationValidation = {
    create: [
        body('titre').trim().notEmpty().withMessage('Le titre est requis'),
        body('contenu').trim().notEmpty().withMessage('Le contenu est requis'),
        body('destinataire_id').isInt().withMessage('ID destinataire invalide'),
        body('type').optional().trim(),
        validate
    ],
    update: [
        body('titre').optional().trim().notEmpty().withMessage('Le titre ne peut pas être vide'),
        body('contenu').optional().trim().notEmpty().withMessage('Le contenu ne peut pas être vide'),
        body('type').optional().trim(),
        validate
    ],
    id: [
        param('id').toInt().isInt().withMessage('ID invalide'),
        validate
    ]
};

const partenaireValidation = {
    create: [
        body('nom').trim().notEmpty().withMessage('Le nom est requis'),
        body('prenom').trim().notEmpty().withMessage('Le prénom est requis'),
        body('nom_entreprise').trim().notEmpty().withMessage('L\'entreprise est requise'),
        body('email').isEmail().normalizeEmail().withMessage('Email invalide'),
        body('mot_de_passe').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
        body('type_partenariat').optional().trim(),
        validate
    ],
    update: [
        body('nom').optional().trim().notEmpty().withMessage('Le nom ne peut pas être vide'),
        body('prenom').optional().trim().notEmpty().withMessage('Le prénom ne peut pas être vide'),
        body('nom_entreprise').optional().trim().notEmpty().withMessage('L\'entreprise ne peut pas être vide'),
        body('email').optional().isEmail().normalizeEmail().withMessage('Email invalide'),
        body('mot_de_passe').optional().isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
        body('type_partenariat').optional().trim(),
        validate
    ],
    id: [
        param('id').toInt().isInt().withMessage('ID invalide'),
        validate
    ]
};

const soumissionValidation = {
    create: [
        body('etudiant_id').isInt().withMessage('ID étudiant invalide'),
        body('travail_pratique_id').isInt().withMessage('ID travail pratique invalide'),
        body('contenu').trim().notEmpty().withMessage('Le contenu est requis'),
        body('date_soumission').optional().isISO8601().withMessage('Date soumission invalide'),
        validate
    ],
    update: [
        body('contenu').optional().trim().notEmpty().withMessage('Le contenu ne peut pas être vide'),
        body('date_soumission').optional().isISO8601().withMessage('Date soumission invalide'),
        validate
    ],
    id: [
        param('id').toInt().isInt().withMessage('ID invalide'),
        validate
    ]
};

const loginValidation = [
    body('email').isEmail().normalizeEmail().withMessage('Email invalide'),
    body('password').notEmpty().withMessage('Le mot de passe est requis'),
    validate
];

module.exports = {
    validate,
    utilisateurValidation,
    etudiantValidation,
    professeurValidation,
    laboratoireValidation,
    travailPratiqueValidation,
    articleRechercheValidation,
    administrateurValidation,
    evaluationValidation,
    experienceValidation,
    notificationValidation,
    partenaireValidation,
    soumissionValidation,
    loginValidation
};
