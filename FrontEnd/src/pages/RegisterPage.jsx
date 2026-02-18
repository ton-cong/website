import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import { toast } from 'react-toastify';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);
        const result = await register({
            email: formData.email,
            password: formData.password,
            fullName: formData.fullName
        });
        setLoading(false);

        if (result.success) {
            toast.success("Account created! Please sign in.");
            navigate('/login');
        } else {
            toast.error(result.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
                    <p className="text-slate-500 mt-2">Join us to start shopping</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Full Name"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                    />

                    <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                    />

                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                    />

                    <Input
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                    />

                    <Button type="submit" className="w-full py-3" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-slate-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-primary hover:text-accent">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
