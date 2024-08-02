export class BeansManger{
    addSingleton<T>(singleton: any, ... dependencies: any): T {
        const dependenciesInstances = dependencies.map((dependency: any) =>{
            if(dependency.constructor.name === singleton.constructor.name){
                return new dependency();
            }
            return  dependency();
        });

        return new singleton(...dependenciesInstances);
    
    }
}