# Balans — Energy Management App

**Balans** is a mobile-first web app for people who need to manage their daily energy carefully. Inspired by Spoon Theory — a framework often used by people with chronic illness (depression, burnout etc) to describe limited energy resources — Balans helps you plan your day around how much energy you actually have, not how much you wish you had.

---

## The Problem

People living with chronic fatigue or energy-limiting conditions often struggle to plan their days in a way that respects their capacity. Traditional to-do apps treat all tasks as equal and don't account for energy cost. Balans fills that gap by letting you log your current energy, plan activities based on what drains or restores you, and reflect on patterns over time.

---

## Features

- **Energy check-in** — Log your energy level (1–10) at the start of each day using an interactive battery visualisation
- **Activity planner** — Add activities to your day, each tagged as energy-draining or energy-restoring, with a cost/gain value
- **Day summary** — See a breakdown of your planned day and get a personalised tip from the mascot based on your energy balance
- **History** — Review past days and track your energy patterns over time
- **Custom activities** — Add your own activities (private to your account) alongside the built-in defaults
- **Animated mascot** — EnergyBlob reacts to your energy level with different expressions and animations
- **User accounts** — Register, log in, and keep your data private with JWT-based authentication

---

## Tech Stack

### Frontend
- React + Vite
- styled-components (with CSS custom properties for theming)
- Framer Motion (animations)
- Zustand (global state)
- React Router 
- Phosphor Icons

### Backend
- Node.js + Express
- MongoDB + Mongoose
- bcrypt (password hashing)
- Babel + Nodemon

---

## Deployment

- **Frontend:** [Netlify](https://final-project-balans.netlify.app)
- **Backend:** [Render](https://project-final-balans.onrender.com)

---

## What's Next

- Mood tracking alongside energy levels
- AI-powered suggestions based on your personal energy history
- Weekly and monthly energy overview charts
- Adding a calender to plan a week ahead
- Checkboxes in history, to be able to check the activities you completed in the end om the day

---

## About the Name

*Balans* is the Swedish word for balance — because the goal isn't to do more, it's to find the balance that works for you.
