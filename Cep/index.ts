import {IInputs, IOutputs} from "./generated/ManifestTypes";
import { Http2ServerRequest } from "http2";
import { timingSafeEqual } from "crypto";


export class Cep implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private label: HTMLInputElement;
	private _context: ComponentFramework.Context<IInputs>;
	private _container: HTMLDivElement;
	private _refreshData: EventListenerOrEventListenerObject;
	private _notifyOutputchanged: () => void;

	private CepDiv: HTMLDivElement;
	private CepControl: HTMLInputElement;
	private CepLabel: HTMLLabelElement;
	private Logradouro: string;
	private Cidade:string;
	private Estado:string;
	private Bairro: string;
	private cepValue:string; 
	private Complemento:string;

	private LogradouroDiv: HTMLDivElement;
	private LogradouroControl:  HTMLInputElement;
	private LogradouroLabel: HTMLLabelElement;
	private _refreshLogradouroData: EventListenerOrEventListenerObject;

	private CidadeDiv: HTMLDivElement;
	private CidadeControl:  HTMLInputElement;
	private CidadeLabel: HTMLLabelElement;
	private _refreshCidadeData: EventListenerOrEventListenerObject;

	private EstadoDiv: HTMLDivElement;
	private EstadoControl:  HTMLInputElement;
	private EstadoLabel: HTMLLabelElement;
	private _refresEstadoData: EventListenerOrEventListenerObject;

	private BairroDiv: HTMLDivElement;
	private BairroControl:  HTMLInputElement;
	private BairroLabel: HTMLLabelElement;
	private _refreshBairroData: EventListenerOrEventListenerObject;

	private ComplementoDiv: HTMLDivElement;
	private ComplementoControl:  HTMLInputElement;
	private ComplementoLabel: HTMLLabelElement;
	private _refreshComplementoData: EventListenerOrEventListenerObject;

	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='starndard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		// Add control initialization code
		this._context = context;
		this._container = container;
		this._notifyOutputchanged = notifyOutputChanged;
		this._container = document.createElement("div");
		this._container.setAttribute("class","cep-control");
		this._refreshData = this.refreshData.bind(this);
		this._refresEstadoData = this.refreshEstadooData.bind(this);
		this._refreshCidadeData = this.refreshCidadeData.bind(this);
		this._refreshLogradouroData = this.refreshLogradouroData.bind(this);
		this._refreshBairroData = this.refreshBairroData.bind(this);
		this._refreshComplementoData = this.refreshComplementoData.bind(this);

		container.appendChild(this._container);

		this.renderCepControl(this._context);
		this.renderLogradouroControl(this._context);
		this.renderComplementoControl(this._context);
		this.renderCidadeControl(this._context);
		this.renderEstadoControl(this._context);
		this.renderBairroControl(this._context);

	}

	private renderCepControl(context:ComponentFramework.Context<IInputs>):void  {

		
		this.CepDiv = document.createElement("div");
		//this.CepDiv.setAttribute("class","cep-control cep-field");
		this.CepControl = document.createElement("input");
		this.CepControl.setAttribute("type","text");
		this.CepControl.setAttribute("maxlength","9");
		this.CepControl.setAttribute("id","cepControl");
		this.CepControl.addEventListener("input",this._refreshData);
		this.CepControl.setAttribute("value",context.parameters.CepValue.formatted ? context.parameters.CepValue.formatted : "" );

		this.CepLabel = document.createElement("label");
		this.CepLabel.setAttribute("class","label");
		this.CepLabel.innerHTML = "CEP:"; //context.parameters.CepValue.formatted ? context.parameters.CepValue.formatted : "";

		
		this.CepDiv.appendChild(this.CepLabel);
		this.CepDiv.appendChild(this.CepControl);
		this._container.appendChild(this.CepDiv);
		
	}

	public renderCidadeControl(context:ComponentFramework.Context<IInputs>) : void {

		this.CidadeDiv = document.createElement("div");
		//this.CidadeDiv.setAttribute("class","cep-control cep-field");
		this.CidadeControl = document.createElement("input");
		this.CidadeControl.setAttribute("type","text");
		this.CidadeControl.setAttribute("id","cidadeControl");
		this.CidadeControl.setAttribute("value",context.parameters.CidadeValue.formatted ? context.parameters.CidadeValue.formatted : "" );
		this.CidadeControl.addEventListener("input",this._refreshCidadeData);
		this.CidadeLabel = document.createElement("label");
		this.CidadeLabel.setAttribute("class","label");
		this.CidadeLabel.innerHTML = "Cidade:";//context.parameters.CidadeValue.formatted ? context.parameters.CidadeValue.formatted : "";
 
		

		this.CidadeDiv.appendChild(this.CidadeLabel);
		this.CidadeDiv.appendChild(this.CidadeControl);
		this._container.appendChild(this.CidadeDiv);
	}

	public renderEstadoControl(context:ComponentFramework.Context<IInputs>) : void {

		this.EstadoDiv = document.createElement("div");
		//this.EstadoDiv.setAttribute("class","cep-control cep-field");
		this.EstadoControl = document.createElement("input");
		this.EstadoControl.setAttribute("type","text");
		this.EstadoControl.setAttribute("id","cidadeControl");
		this.EstadoControl.setAttribute("value",context.parameters.CidadeValue.formatted ? context.parameters.CidadeValue.formatted : "" );
		this.EstadoControl.addEventListener("input",this._refresEstadoData);
		this.EstadoLabel = document.createElement("label");
		this.EstadoLabel.setAttribute("class","label");
		this.EstadoLabel.innerHTML = "Estado:";//context.parameters.CidadeValue.formatted ? context.parameters.CidadeValue.formatted : "";
 
		this.EstadoDiv.appendChild(this.EstadoLabel);
		this.EstadoDiv.appendChild(this.EstadoControl);
		this._container.appendChild(this.EstadoDiv);
	}

	public renderLogradouroControl(context:ComponentFramework.Context<IInputs>) : void {
		this.LogradouroDiv = document.createElement("div");
		//this.LogradouroDiv.setAttribute("class","cep-control cep-field");
		this.LogradouroControl = document.createElement("input");
		this.LogradouroControl.setAttribute("type","text");
		this.LogradouroControl.setAttribute("id","cidadeControl");
		this.LogradouroControl.setAttribute("value",context.parameters.CidadeValue.formatted ? context.parameters.CidadeValue.formatted : "" );
		this.LogradouroControl.addEventListener("input",this._refreshLogradouroData);
		this.LogradouroLabel = document.createElement("label");
		this.LogradouroLabel.setAttribute("class","label");
		this.LogradouroLabel.innerHTML = "Endereço:";//context.parameters.CidadeValue.formatted ? context.parameters.CidadeValue.formatted : "";
 
		this.LogradouroDiv.appendChild(this.LogradouroLabel);
		this.LogradouroDiv.appendChild(this.LogradouroControl);
		this._container.appendChild(this.LogradouroDiv);
	}

	public renderBairroControl(context:ComponentFramework.Context<IInputs>) : void {
		this.BairroDiv = document.createElement("div");
		// this.BairroDiv.setAttribute("class","no-border");
		this.BairroControl = document.createElement("input");
		this.BairroControl.setAttribute("type","text");
		this.BairroControl.setAttribute("id","cidadeControl");
		this.BairroControl.setAttribute("value",context.parameters.BairroValue.formatted ? context.parameters.BairroValue.formatted : "" );
		this.BairroControl.addEventListener("input",this._refreshBairroData);
		this.BairroLabel = document.createElement("label");
		this.BairroLabel.setAttribute("class","label");
		this.BairroLabel.innerHTML = "Bairro:"; //context.parameters.BairroValue.formatted ? context.parameters.BairroValue.formatted : "";
 
		this.BairroDiv.appendChild(this.BairroLabel);
		this.BairroDiv.appendChild(this.BairroControl);
		this._container.appendChild(this.BairroDiv);
	}

	public renderComplementoControl(context:ComponentFramework.Context<IInputs>) : void {
		this.ComplementoDiv = document.createElement("div");
		// this.BairroDiv.setAttribute("class","no-border");
		this.ComplementoControl = document.createElement("input");
		this.ComplementoControl.setAttribute("type","text");
		this.ComplementoControl.setAttribute("id","complementoControl");
		this.ComplementoControl.setAttribute("value",context.parameters.ComplementoValue.formatted ? context.parameters.ComplementoValue.formatted : "" );
		this.ComplementoControl.addEventListener("input",this._refreshComplementoData);
		this.ComplementoLabel = document.createElement("label");
		this.ComplementoLabel.setAttribute("class","label");
		this.ComplementoLabel.innerHTML = "Complemento:"; //context.parameters.BairroValue.formatted ? context.parameters.BairroValue.formatted : "";
 
		this.ComplementoDiv.appendChild(this.ComplementoLabel);
		this.ComplementoDiv.appendChild(this.ComplementoControl);
		this._container.appendChild(this.ComplementoDiv);
	}

	/**
	 * Atualiza os valores para o valor interno
	 * @param evt 
	 */
	public refreshData(evt: Event): void{
		
		this.cepValue = this.CepControl.value
		
		this.buscaCep(this.cepValue);
		this._notifyOutputchanged();
		
	}

	public cleanData():void{
		this.Logradouro = "";
		this.Cidade = "";
		this.Bairro = "";
		this.Estado = "";

		this.CidadeControl.setAttribute("value",this.Cidade);	
		this.EstadoControl.setAttribute("value",this.Estado);	
		this.LogradouroControl.setAttribute("value",this.Logradouro);	
		this.BairroControl.setAttribute("value",this.Bairro);	

		this.AtualizaValoresCampos();
	}

	public refreshLogradouroData(evt: Event): void{
		
		this.Logradouro = this.LogradouroControl.value;
		console.log(this.Logradouro);
		this._notifyOutputchanged();
		
	}

	public refreshComplementoData(evt: Event): void{
		
		this.Complemento = this.ComplementoControl.value;
		
		this._notifyOutputchanged();
		
	}

	public refreshEstadooData(evt: Event): void{
		
		this.Estado = this.EstadoControl.value ;
		this._notifyOutputchanged();
	}

	public refreshCidadeData(evt: Event): void{
		
		this.Cidade = this.CidadeControl.value;
		this._notifyOutputchanged();
	}

	public refreshBairroData(evt: Event): void{
		
		this.Bairro = this.BairroControl.value;
		this._notifyOutputchanged();
	}




	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
		this.cepValue = context.parameters.CepValue.raw;
		this.Cidade = context.parameters.CidadeValue.raw;
		this.Logradouro = context.parameters.LogradouroValue.raw;
		this.Estado = context.parameters.EstadoValue.raw;
		this.Bairro = context.parameters.BairroValue.raw;
		this.Complemento = context.parameters.ComplementoValue.raw;
		this._context = context;
		this.CepControl.setAttribute("value",context.parameters.CepValue.formatted ? context.parameters.CepValue.formatted : "");
		this.CidadeControl.setAttribute("value",context.parameters.CidadeValue.formatted ? context.parameters.CidadeValue.formatted : "");	
		this.EstadoControl.setAttribute("value",context.parameters.EstadoValue.formatted ? context.parameters.EstadoValue.formatted : "");	
		this.LogradouroControl.setAttribute("value",context.parameters.LogradouroValue.formatted ? context.parameters.LogradouroValue.formatted : "");	
		this.BairroControl.setAttribute("value",context.parameters.BairroValue.formatted ? context.parameters.BairroValue.formatted : "");	
		this.ComplementoControl.setAttribute("value",context.parameters.ComplementoValue.formatted ? context.parameters.ComplementoValue.formatted : "");	
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {
			CepValue: this.cepValue,
			LogradouroValue: this.Logradouro,
			EstadoValue: this.Estado,
			CidadeValue:this.Cidade,
			BairroValue:this.Bairro,
			ComplementoValue: this.Complemento

		};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
		this.CepControl.removeEventListener("input",this._refreshData);
		this.EstadoControl.removeEventListener("input",this._refresEstadoData);
		this.CidadeControl.removeEventListener("input",this._refreshCidadeData);
		this.LogradouroControl.removeEventListener("input",this._refreshLogradouroData);
		this.BairroControl.removeEventListener("input",this._refreshBairroData);
	}

	private buscaCep(cep:string):void{

		cep = cep.substring(0, 5) + "-" + cep.substring(5);
		if(cep !== "" && cep.length === 9)
		{
			const webRequest = require('https');
			
			webRequest.get('https://viacep.com.br/ws/'+ cep + '/json/',(responseCep:any) => {
				let data = '';

				responseCep.on('data',(chunk:any)=>{
					data+= chunk;
				});

				responseCep.on('end',() => {
					let cepData = JSON.parse(data);

					if(!cepData.erro)
					{
						this.Logradouro = cepData.logradouro;
						this.Cidade = cepData.localidade;
						this.Bairro = cepData.bairro;
						this.Estado = cepData.uf;
						this.CepControl.classList.remove("wrong");
					}
					else
					{
						this.CepControl.classList.add("wrong");
					}


					this.CidadeControl.setAttribute("value",this.Cidade);	
					this.EstadoControl.setAttribute("value",this.Estado);	
					this.LogradouroControl.setAttribute("value",this.Logradouro);	
					this.BairroControl.setAttribute("value",this.Bairro);	

					this.AtualizaValoresCampos();
					
					
					
				});
			}).on('error',(err:{message:string;}) => {
				console.log("Erro:" + err.message);
			});
			
		}
		else
		{
			this.cleanData();
		}
	}

	private AtualizaValoresCampos() : void
	{
		let event = new Event('input', { bubbles: true });
		this.CidadeControl.dispatchEvent(event);
		this.LogradouroControl.dispatchEvent(event);
		this.BairroControl.dispatchEvent(event);
		this.CidadeControl.dispatchEvent(event);
		this.EstadoControl.dispatchEvent(event);
		this.ComplementoControl.dispatchEvent(event);
		
	}
}