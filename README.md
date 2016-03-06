### Potential todos
- Pakeisti favicona (src/static/favicon.ico) i seeStats logotipa
- Sutvarkyti api ir padaryti kad grazintu tikra data vietoj fake (src/utils/getDataFromApi)
- Pakeisti getDomain funkcija kad neatsirastu labai ilgu domainu del kuriu gautus labai mazas chartas (galbut paprasciausiai limituot ju ilgi iki pvz. 20 simboliu) (src/utils/getDomain)
- Isimti randoma is src/utils/parseApiData
- Isimiau meniu, jei nuspresit kad norit daugiau negu 1 puslapio atkomentuokit ji src/layouts/CoreLayout/CoreLayout
- Patobulinti dizaina (src/styles.scss, src/views/HomeView/HomeView, src/components/*)


Jei idesit i puslapi daug chartu kuriuos daznai real time updeitinsit gali fps krist -> jei krenta fps padidinkit intervala tarp charto duomenu atnaujinimu


First
`npm install`


To start in dev mode
`npm run dev`


For production
`npm run deploy`
 (compiles to dist directory)

[Boilerplate link (may help)](https://github.com/davezuko/react-redux-starter-kit/tree/new-project)
