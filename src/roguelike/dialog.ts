import { RoguelikeModel } from './RoguelikeModel';
import { RoguelikeScene } from './RoguelikeScene';
import { Dialog } from '../DialogBuilder2';
import { RandomProvider } from '../DialogBuilder2/RandomProvider';

export const roguelikeDialog = new Dialog<RoguelikeScene, RoguelikeModel>(RoguelikeModel, {
    scenes: {
        [RoguelikeScene.Start]: {
            reply(reply) {
                reply.withText('Привет, ребята!');
            },
            onTransition() {
                return RoguelikeScene.AskDifferences;
            },
        },
        [RoguelikeScene.AskDifferences]: {
            reply(reply, model) {
                reply.withText(
                    `Чем AskDifferences?`
                );
            },
            unrecognized(reply, model) {
                reply.withText('Ничего не поняла.');
                reply.withText(
                    `Чем же unrecognized AskDifferences?`
                );
            },
            onInput({ intents }, model) {
                return RoguelikeScene.ReviewDifferencesGuess;
            },
        },
        [RoguelikeScene.ReviewDifferencesGuess]: {
            reply(reply, model) {
                reply.withText(
                    `Да ReviewDifferencesGuess.`
                );
            },
            onTransition() {
                return RoguelikeScene.AskDifferences;
            },
        },
    },
    random: new RandomProvider(),
});
