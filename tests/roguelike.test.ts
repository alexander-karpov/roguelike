import { roguelikeDialog } from '../src/roguelike/dialog';
import { TestClosure } from '../src/DialogBuilder2';
import { RoguelikeScene } from '../src/roguelike/RoguelikeScene';
import { RoguelikeModel } from '../src/roguelike/RoguelikeModel';

let closure: TestClosure<RoguelikeScene, RoguelikeModel>;

async function text(command: string, intent?: string) {
    const response = await (intent ? closure.handleIntent(intent) : closure.handleCommand(command));

    return response.text;
}

beforeEach(() => {
    closure = new TestClosure(roguelikeDialog);
});

test('Начало игры', async () => {
    const greating = await text('');
    expect(greating).toMatch('Привет, ребята! Чем AskDifferences?');
});
