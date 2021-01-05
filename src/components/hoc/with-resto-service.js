import React from 'react';
import RestoServiceContext from '../resto-service-context/resto-service-context';

// const WithRestoService = () => (Wrapped) => {
//     return (props)=>{
// 		return (
// 			<RestoServiceContext.Consumer>
// 				{
// 					(RestoService)=>{
// 						return <Wrapped {...props} RestoService={RestoService}/>
// 					}
// 				}
// 			</RestoServiceContext.Consumer>
// 		);
// 	};
// };
const WithRestoService = (Wrapped)=>{
	return class extends React.Component{
		render(){
			return(
				<RestoServiceContext.Consumer>
					{
						(RestoService)=>{
							return <Wrapped {...this.props} RestoService={RestoService}/>
						}
					}
				</RestoServiceContext.Consumer>
			)
		}
	}
}

export default WithRestoService;