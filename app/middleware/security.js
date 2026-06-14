class SecurityMiddleware {
    static escapeHtml(str) {
        if (!str) return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    static validateEmail(email) {
        const re = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        return re.test(email);
    }

    static sanitizeInput(input) {
        if (typeof input !== 'string') return input;
        return input.trim().replace(/[<>]/g, '');
    }

    static validateProgramLevel(level) {
        const validLevels = ['beginner', 'intermediate', 'advanced'];
        return validLevels.includes(level);
    }

    static validatePositiveInt(value) {
        const num = parseInt(value);
        return !isNaN(num) && num > 0;
    }
}
module.exports = SecurityMiddleware;