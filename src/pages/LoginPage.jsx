import { useState } from 'react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { useNavigate } from 'react-router-dom'
import authService from '../services/authService'
import { setStoredToken, setStoredUser } from '../utils/storage'

function LoginPage() {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })
  const [formErrors, setFormErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))
    setFormErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = {}

    if (!formValues.email.trim()) {
      nextErrors.email = 'Email is required.'
    }

    if (!formValues.password.trim()) {
      nextErrors.password = 'Password is required.'
    }

    setFormErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsLoading(true)

    try {
      const response = await authService.login({
        email: formValues.email,
        password: formValues.password,
      })

      setStoredToken(response.data.token)
      setStoredUser(response.data.user)

      navigate('/dashboard')
    } catch (error) {
      const message =
        error.response?.data?.message || 'Unable to sign in. Please try again.'

      setFormErrors({
        password: message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-10 px-4 py-10 lg:grid-cols-[1fr_440px] lg:px-6">
        <section className="hidden lg:block">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Mini E-Wallet
          </p>
          <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-normal text-slate-950">
            Secure access to your wallet dashboard
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-slate-600">
            Review your balance, prepare transfers, and track recent activity from one clean workspace.
          </p>
        </section>

        <section className="w-full rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div>
            <p className="text-sm font-semibold text-slate-500 lg:hidden">Mini E-Wallet</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">Sign in</h2>
            <p className="mt-2 text-sm text-slate-600">
              Enter your credentials to continue to your wallet.
            </p>
          </div>

          <form className="mt-8 space-y-5" noValidate onSubmit={handleSubmit}>
            <Input
              autoComplete="email"
              error={formErrors.email}
              id="email"
              label="Email address"
              name="email"
              onChange={handleChange}
              placeholder="you@example.com"
              type="email"
              value={formValues.email}
            />

            <Input
              autoComplete="current-password"
              error={formErrors.password}
              id="password"
              label="Password"
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
              type="password"
              value={formValues.password}
            />

            <Button isLoading={isLoading} type="submit">
              {isLoading ? 'Signing in' : 'Sign in'}
            </Button>
          </form>
        </section>
      </div>
    </main>
  )
}

export default LoginPage
