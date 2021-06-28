export interface Bus{
    id: string;
    nome: string;
    percorso: Record<number, string[]>; //con number si intende lo stopId
    
}