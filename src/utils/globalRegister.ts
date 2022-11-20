import components from './components';
console.log('components: ', components);

export default (app: any) => {
  Object.keys(components).forEach((key:string) => {
    app.component(key, components[key]); 
  })
};
