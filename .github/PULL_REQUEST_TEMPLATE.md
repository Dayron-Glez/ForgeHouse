## 📋 Descripcion

Describe brevemente que hace este PR y por que es necesario.

---

## 🔗 Issue relacionado

Closes #
Relacionado con #

---

## 📍 Workspace afectado

- [ ] 🖥 Frontend
- [ ] ⚙ Backend
- [ ] 📦 Shared
- [ ] 🏗 Monorepo / Config general

---

## 🏷 Tipo de cambio

- [ ] 🚀 New feature (nueva funcionalidad)
- [ ] 🐛 Bug fix (correccion de error)
- [ ] 🎨 Style / UI (cambios visuales)
- [ ] ♻️ Refactor (mejora de codigo sin cambiar funcionalidad)
- [ ] 📚 Documentation (documentacion)
- [ ] 🔧 Chore (config, dependencias, CI/CD)

---

## ✅ Checklist

### General

- [ ] El codigo compila sin errores
- [ ] He probado los cambios manualmente
- [ ] No rompe funcionalidad existente
- [ ] El codigo sigue las convenciones del proyecto

### ⚙ Si toca Backend

- [ ] Los endpoints responden correctamente
- [ ] Las entidades de TypeORM tienen `type` explicito en cada `@Column()`
- [ ] Las validaciones con Zod funcionan
- [ ] El seed sigue funcionando (si se modificaron entidades)

### 🖥 Si toca Frontend

- [ ] Los componentes renderizan correctamente
- [ ] Es responsive (mobile, tablet, desktop)
- [ ] Los formularios validan correctamente (React Hook Form + Zod)
- [ ] El estado de Redux se actualiza correctamente

### 📦 Si toca Shared

- [ ] Los tipos son consistentes con backend y frontend
- [ ] Los barrel exports (`index.ts`) estan actualizados

---

## 📸 Capturas

Capturas, GIFs o videos si aplica.

---

## 📝 Notas adicionales

Cualquier contexto adicional para el reviewer.
