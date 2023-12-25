import { Grid, Card } from "@mui/material";
import { styles } from "@/app/[lng]/Components/MagazineCards/MagazineCards.style";
import { MagazineCardsProps } from "@/app/[lng]/general/interfaces";
import MagazineCardContent from "@/app/[lng]/Components/MagazineCardContent";

export default function MagazineCards({
    selectedCard,
    selectedCardHandler,
    cards,
}: MagazineCardsProps) {
    return (
        <Grid item xs={6}>
            {cards.map((card) => (
                <Grid item key={card?.id} xs={12}>
                    <Card
                        key={card?.id}
                        sx={
                            card === selectedCard
                                ? styles.cardSelected
                                : styles.card
                        }
                        onClick={() => {
                            selectedCardHandler(card);
                            window.scrollTo(0, 0);
                        }}
                    >
                        <MagazineCardContent card={card} />
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
