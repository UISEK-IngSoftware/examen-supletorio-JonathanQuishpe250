import { useState, useEffect } from 'react';
import { Character } from '../models/character.model';
import { characterService } from '../services/character.service';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonAvatar,
  IonLabel,
  IonLoading,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonBadge
} from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await characterService.getCharacters(1);
      setCharacters(data);
    } catch (err) {
      setError('Error al cargar los personajes. Por favor, intenta de nuevo.');
      console.error('Error loading characters:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>The Simpsons Characters</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        <IonLoading
          isOpen={loading}
          message={'Cargando personajes...'}
        />

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">The Simpsons</IonTitle>
          </IonToolbar>
        </IonHeader>

        {error && !loading && (
          <IonCard color="danger">
            <IonCardHeader>
              <IonCardTitle>Error</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{error}</IonCardContent>
          </IonCard>
        )}

        {!loading && !error && characters.length > 0 && (
          <IonList>
            {characters.map((character) => (
              <IonItem key={character.id} lines="full">
                <IonAvatar slot="start">
                  <img
                    src={characterService.getImageUrl(character.portrait_path)}
                    alt={character.name}
                  />
                </IonAvatar>

                <IonLabel>
                  <h2>
                    <strong>{character.name}</strong>
                  </h2>
                  <h3>Ocupación: {character.occupation}</h3>
                  <p>
                    Estado:{' '}
                    <IonBadge color={character.status === 'Alive' ? 'success' : 'danger'}>
                      {character.status}
                    </IonBadge>
                  </p>
                  <p>Edad: {character.age ?? 'N/A'}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}

        {!loading && !error && characters.length === 0 && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>No hay personajes</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              No se encontraron personajes para mostrar.
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
